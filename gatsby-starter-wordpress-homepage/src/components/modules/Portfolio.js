import {useStaticQuery, graphql} from 'gatsby'
import * as React from 'react';
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import {globalHistory} from '@reach/router';
import config from "../../../config";

export default function Portfolio() {
    const {allWpPost} = useStaticQuery(graphql`
        {
            allWpPost(
                filter: {categories: {nodes: {elemMatch: {slug: {eq: "s_portfolio"}}}}}
            ) {
                nodes {
                    content
                    title
                    excerpt
                    featuredImage {
                        node {
                            publicUrl
                            gatsbyImage(width: 400, height:300, layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO])
                        }
                    }
                    tags {
                        nodes {
                            name
                        }
                    }
                }
            }
        }
    `)

    const PortfolioImage = (image) => {
         if ('https:' === globalHistory.location.protocol) {
            return (<img src={config.gatsby.githubusercontent + image.images.fallback.src} alt="Alt" loading="eager"/>)
             } else {
            return (<GatsbyImage image={image} alt="Alt" loading="eager"/>)
        }
    }

    return (
        <section id="portfolio" className="s_portfolio bg_dark">
            <div className="section_header">
                <h2>Портфолио</h2>
                <div className="s_descr_wrap">
                    <div className="s_descr">Мои последние работы</div>
                </div>
            </div>
            <div className="section_content">
                <div className="container">
                    <div className="row">
                        <div className="filter_div controls">
                            <ul>
                                <li className="filter active" data-filter="all">Все работы</li>
                                <li className="filter" data-filter=".sites">Сайты</li>
                                <li className="filter" data-filter=".identy">Айдентика</li>
                                <li className="filter" data-filter=".logos">Логотипы</li>
                            </ul>
                        </div>
                        <div id="portfolio_grid">
                            {allWpPost.nodes.map((node) => {

                                    var image = getImage(node.featuredImage.node.gatsbyImage);

                                    return (
                                        <div className={`mix col-md-3 col-sm-6 col-xs-12 portfolio_item 
                                    ${node.tags.nodes.map(el => el.name).join(" ")}`}>
                                            {PortfolioImage(image)}

                                            <div className="port_item_cont">
                                                <h3>{node.title}</h3>
                                                <div dangerouslySetInnerHTML={{__html: node.excerpt}}/>
                                                <a href="#" className="popup_content">Посмотреть</a>
                                            </div>
                                            <div className="hidden">
                                                <div className="podrt_descr">
                                                    <div className="modal-box-content">
                                                        <button className="mfp-close" type="button"
                                                                title="Закрыть (Esc)">×
                                                        </button>
                                                        <h3>{node.title}</h3>
                                                        <div dangerouslySetInnerHTML={{__html: node.content}}/>
                                                        {PortfolioImage(image)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                            })}
                                </div>
                                </div>
                                </div>
                                </div>
                                </section>
                                )
                            }