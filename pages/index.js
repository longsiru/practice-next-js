import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    //router.push(`/movies/${id}`); 只出现id
    //出现id并出现检索的详细，但是可能很多人不想看到详细，那么我们就要把这些隐藏起来, 用as。url看不见了，但是inspect里面是可以查看的
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div>
      <div className="container">
        <Seo title="Home" />
        {results?.map((movie) => (
          <div
            onClick={() => onClick(movie.id, movie.original_title)}
            className="movie"
            key={movie.id}
          >
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />

            <h4>
              <Link
                legacyBehavior
                href={`/movies/${movie.original_title}/${movie.id}`}
              >
                <a>{movie.original_title}</a>
              </Link>
            </h4>
          </div>
        ))}
        <style jsx>{`
          .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 20px;
            gap: 20px;
          }
          .movie {
            cursor: pointer;
          }
          .movie img {
            max-width: 100%;
            border-radius: 12px;
            transition: transform 0.2s ease-in-out;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          }
          .movie:hover img {
            transform: scale(1.05) translateY(-10px);
          }
          .movie h4 {
            font-size: 18px;
            text-align: center;
          }
        `}</style>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  //this name is very important , cannot change, code in this componet only runs on the server.
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
