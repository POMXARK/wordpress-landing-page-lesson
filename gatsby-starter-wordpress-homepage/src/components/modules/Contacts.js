import {useStaticQuery, graphql} from 'gatsby'
import * as React from 'react';

export default function Contacts() {
    const {wp} = useStaticQuery(graphql`
        {
            wp {
                allSettings {
                    phone
                    color
                    email
                    site
                }
            }
        }
    `)

    return (
        <section id="contacts" className="s_contacts bg_light">
            <div className="section_header">
                <h2>Контакты</h2>
                <div className="s_descr_wrap">
                    <div className="s_descr">Оставьте ваше сообщение</div>
                </div>
            </div>
            <div className="section_content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <div className="contact_box">
                                <div className="contacts_icon icon-basic-geolocalize-05"></div>
                                <h3>Адрес:</h3>
                                <p>{wp.allSettings.address}</p>
                            </div>
                            <div className="contact_box">
                                <div className="contacts_icon icon-basic-smartphone"></div>
                                <h3>Телефон:</h3>
                                <p>{wp.allSettings.phone}</p>
                            </div>
                            <div className="contact_box">
                                <div className="contacts_icon icon-basic-webpage-img-txt"></div>
                                <h3>Веб-сайт:</h3>
                                <p><a href={wp.allSettings.site} target="_blank"><p>{wp.allSettings.site}</p></a></p>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                            <form action={wp.allSettings.email} className="main_form" noValidate
                                  target="_blank" method="post">
                                <label className="form-group">
                                    <span className="color_element">*</span> Ваше имя:
                                    <input type="text" name="name" placeholder="Ваше имя"
                                           data-validation-required-message="Вы не ввели имя" required/>
                                    <span className="help-block text-danger"></span>
                                </label>
                                <label className="form-group">
                                    <span className="color_element">*</span> Ваш E-mail:
                                    <input type="email" name="email" placeholder="Ваш E-mail"
                                           data-validation-required-message="Не корректно введен E-mail" required/>
                                    <span className="help-block text-danger"></span>
                                </label>
                                <label className="form-group">
                                    <span className="color_element">*</span> Ваше сообщение:
                                    <textarea name="message" placeholder="Ваше сообщение"
                                              data-validation-required-message="Вы не ввели сообщение"
                                              required></textarea>
                                    <span className="help-block text-danger"></span>
                                </label>
                                <button>Отправить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}