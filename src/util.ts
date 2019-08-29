export const parseLink = (s: string): { [k: string]: string } => {
  const output = {};
  const regex = /<([^>]+)>; rel="([^"]+)"/g;

  let m;
  while ((m = regex.exec(s))) {
    const [_, v, k] = m;
    output[k] = v;
  }

  return output;
};

export const formatNumber = (n: number) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const requestUrl = "https://api.github.com/search/repositories?per_page=10";

export const search = ({
  query,
  stars,
  license,
  isFork
}: {
  query: string;
  stars: string;
  license: string;
  isFork: boolean;
}) =>
  fetchRepos(
    `${requestUrl}&q=${query}+in:name+sort:stars${
      stars ? "+stars:" + stars : ""
    }${license ? "+license:" + license : ""}${
      isFork ? "+fork:true" : ""
    }&page=1`
  );

export const fetchRepos = (url: string) => {
  return fetch(url).then(res => {
    return res.json().then(data => {
      return {
        totalCount: data.total_count,
        items: data.items,
        links: parseLink(res.headers.get("Link")),
        currentPage: /&page=(\d)/g.exec(url)[1]
      };
    });
  });
};
