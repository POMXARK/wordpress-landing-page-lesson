import { useStaticQuery, graphql } from 'gatsby'
import * as React from 'react';
import ImgPhoto from '../../img/photo.jpg'

export default function AboutMy() {
    const {wp, allWpPost} = useStaticQuery(graphql`
        {
            wp {
                allSettings {
                    generalSettingsTitle
                    generalSettingsDescription
                }
            }
            allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {eq: "s_about"}}}}}) {
                nodes {
                    content
                    guid
                    categories {
                        nodes {
                            name
                            description
                        }
                    }
                }
            }
        }
    `)

    const isCategorySame = allWpPost.nodes[0].categories.toString() === allWpPost.nodes[1].categories.toString()

    return (
        <>
            <section id="about" className="s_about bg_light">
                <div className="section_header">
                    <h2>{isCategorySame ? allWpPost.nodes[0].categories.nodes[0].name : "Обо мне"}</h2>
                    <div className="s_descr_wrap">
                        <div className="s_descr">{isCategorySame ? allWpPost.nodes[0].categories.nodes[0].description : "Познакомимся ближе"}</div>
                    </div>
                </div>
            <div className="section_content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-push-4 animation_1">
                            <h3>Фото</h3>
                            <div className="person">
                                <a href={ImgPhoto} className="popup"><img src={ImgPhoto} alt="Alt"/></a>
                            </div>
                        </div>
                        <div className="col-md-4 col-md-pull-4 animation_2">
                            <h3>Немного о себе</h3>
                            {allWpPost.nodes.map((node) => {
                                if (node.guid === '/?p=7') {
                                    return ((<div dangerouslySetInnerHTML={{ __html: node.content}}/>))
                                }
                            })}
                        </div>
                        <div className="col-md-4 animation_3 personal_last_block">
                            <h3>Персональная информация</h3>
                            <h2 className="personal_header">{wp.allSettings.generalSettingsTitle}</h2>
                            {allWpPost.nodes.map((node) => {
                                if (node.guid === '/?p=10') {
                                    return ((<div dangerouslySetInnerHTML={{ __html: node.content}}/>))
                                }
                            })
                            }
                            <div className="social_wrap">
                                <ul>
                                    <li><a href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
                                    <li><a href="#" target="_blank"><i className="fa fa-vk"></i></a></li>
                                    <li><a href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
                                    <li><a href="#" target="_blank"><i className="fa fa-github"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </section>
        </>
    )
}