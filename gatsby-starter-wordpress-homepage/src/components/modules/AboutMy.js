import { useStaticQuery, graphql } from 'gatsby'
import * as React from 'react';

export default function AboutMy() {
    const {allWpPost} = useStaticQuery(graphql`
        {
            allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {eq: "s_about"}}}}}) {
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