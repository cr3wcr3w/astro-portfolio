import { onMount, createSignal, onCleanup } from "solid-js";

type GistType = {
    filename: string;
    html_url: string;
    updated_at: string;
    files: Record<string, { filename: string }>;
  };

export const FetchGist = () => {

    const [data, setData] = createSignal([]);
    const [isError, setIsError] = createSignal(false);
    const [isLoading, setIsLoading] = createSignal(false);

    const abortController = new AbortController();

    const fetchRepos = async (username: string) => {
        const url = `https://api.github.com/users/${username}/gists`;

        const data = await fetch(url, {
            signal: abortController.signal,
        });

        setIsLoading(true)
        const res = await data.json();

        return res;

    };

    onMount(() => {

        fetchRepos("cr3wcr3w").then((res) => {
            const filteredGists = res.map((repo: GistType) => ({
              html_url: repo.html_url,
              filename: repo.files[Object.keys(repo.files)[0]].filename,
              updated_at: repo.updated_at,
            }));
            setIsLoading(false)
            setData(filteredGists);
          }).catch((_) => {
            setIsError(true)
            setIsLoading(false)
        })

        onCleanup(() => {
            abortController.abort();
        })
    });


    return { data, isError, isLoading }
};