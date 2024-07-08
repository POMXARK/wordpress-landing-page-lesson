import {useStaticQuery, graphql} from 'gatsby'
import * as React from 'react';

export default function Footer() {
    const {wp} = useStaticQuery(graphql`
        {
            wp {
                allSettings {
                    generalSettingsTitle
                }
            }
        }
    `)

    return (
        <footer className="main_footer bg_dark">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        &copy; {new Date().getFullYear()} {wp.allSettings.generalSettingsTitle}
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
        </footer>
    )
}