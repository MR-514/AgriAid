import { useRouter } from "next/router";
import useBlog from "./blog.hooks";
import { createClient } from 'contentful';
    import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const BlogDetails = () => {
    const router = useRouter();
    // console.log(router.query.id);
    const { loading, error, data } = useBlog();
    // console.log(data?.blogCollection.items[0].longDescription);

    const id = Number(router.query.id);
    // const richTextDocument = data?.blogCollection.items.find((item, index) => index === router.query.id)?.longDescription.json ?? null;
    // const richTextDocument = data?.blogCollection.items.map((content, index) => (
    //     id === index && (
    //         content.longDescription.json
    //     )
    // ))
    const richTextDocument = data?.blogCollection.items.find((item, index) => index === id)?.longDescription.json.content ?? null;

    console.log(richTextDocument)

    return(
        <>
            <h1>hello</h1>
        </>
    )
}

export default BlogDetails;
