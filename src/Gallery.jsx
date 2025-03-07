import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";

const apiKey = import.meta.env.VITE_API_KEY;

const Gallery = () => {
    const { searchQuery } = useGlobalContext();
    const url = `https://api.unsplash.com/search/photos?query="${searchQuery}"&client_id=${apiKey}&per_page=25&page=1`;
    const { data, isLoading, isError } = useQuery({
        queryFn: async () => {
            return await axios.get(url);
        },
        queryKey: ["images", searchQuery],
    });
    const results = data?.data?.results;
    if (isError)
        return (
            <section className="image-container">
                <h4>Something went wrong :(</h4>
            </section>
        );
    if (isLoading)
        return (
            <section className="image-container">
                <h4>Loading...</h4>
            </section>
        );
    if (results.length < 1)
        return (
            <section className="image-container">
                <h4>No results found</h4>
            </section>
        );

    return (
        <section className="image-container">
            {results.map((image) => (
                <img
                    src={image?.urls?.regular}
                    alt={image?.alt_description}
                    className="img"
                    key={image?.id}
                />
            ))}
        </section>
    );
};

export default Gallery;
