import { useStaticQuery, graphql } from 'gatsby'
import * as React from 'react';

export default function Work() {
    const {allWpPost} = useStaticQuery(graphql`
        {
            allWpPost(
                filter: {categories: {nodes: {elemMatch: {slug: {in: ["c_work"]}}}}}
            ) {
                nodes {
                    content
                }
            }
        }
    `)

    return (
        <ul>
            {allWpPost.nodes.map((node) => (
                (<div dangerouslySetInnerHTML={{ __html: node.content}}/>)
            ))}
        </ul>

    )
}