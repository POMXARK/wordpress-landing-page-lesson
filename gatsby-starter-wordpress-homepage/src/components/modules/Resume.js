import { useStaticQuery, graphql } from 'gatsby'
import * as React from 'react';

export default function Resume() {
    const {allWpPost} = useStaticQuery(graphql`
        {
            allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {in: ["c_work","c_edu"]}}}}}) {
                nodes {
                    content
                    slug
                    title
                    resumePlace
                    resumeYears
                    categories {
                        nodes {
                            slug
                            name
                        }
                    }
                }
            }
        }
    `)

    let works = []

    let edus = []

    allWpPost.nodes.map((node) => {
        console.log("node", node.categories.nodes)
        node.categories.nodes.forEach(category => {
            if (category.slug === "c_work") {
                works.push(node)
            }
            if (category.slug === "c_edu") {
                edus.push(node)
            }
        })})

    return (
            <section id="resume" className="s_resume">
                <div className="section_header">
                    <h2>Резюме</h2>
                    <div className="s_descr_wrap">
                        <div className="s_descr">Мои знания и достижения</div>
                    </div>
                </div>
                <div className="section_content">
                    <div className="container">
                        <div className="row">
                            <div className="resume_container">
                                <div className="col-md-6 col-sm-6 left">
                                    <h3>Работа</h3>
                                    <div className="resume_icon"><i className="icon-basic-case"></i></div>
                                    {works.map((node) => (
                                        (
                                            <div className="resume_item">
                                                <div className="year">{node.resumeYears}</div>
                                                <div className="resume_description">{node.resumePlace}
                                                    <strong>{node.title}</strong>
                                                </div>
                                                <div dangerouslySetInnerHTML={{ __html: node.content}}/>
                                            </div>
                                        )
                                    ))}
                                </div>
                                <div className="col-md-6 col-sm-6 right">
                                    <h3>Учеба</h3>
                                    <div className="resume_icon"><i className="icon-basic-book-pen"></i></div>
                                    {edus.map((node) => (
                                        (
                                            <div className="resume_item">
                                                <div className="year">{node.resumeYears}</div>
                                                <div className="resume_description">
                                                    <strong>{node.title}</strong>
                                                    {node.resumePlace}
                                                </div>
                                                <div dangerouslySetInnerHTML={{__html: node.content}}/>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}