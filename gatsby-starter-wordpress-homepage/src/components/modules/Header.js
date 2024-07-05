import { useStaticQuery, graphql } from 'gatsby'
import * as React from 'react';

export default function Header() {
    const {wp} = useStaticQuery(graphql`
        {
            wp {
                allSettings {
                    generalSettingsTitle
                    generalSettingsDescription
                }
            }
        }
    `)

    return (
        <>
            <p>{wp.allSettings.generalSettingsTitle}</p>
            <p>{wp.allSettings.generalSettingsDescription}</p>
        </>
    )
}