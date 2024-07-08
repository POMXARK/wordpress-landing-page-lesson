import "@fontsource/dm-sans"
import "@fontsource/dm-sans/500.css"
import "@fontsource/dm-sans/700.css"
import "@fontsource/dm-mono"
import "@fontsource/dm-mono/500.css"

import * as React from "react";

import "/libs/bootstrap/bootstrap-grid.min.css"
import "/libs/font-awesome/css/font-awesome.min.css"
import "/libs/linea/styles.css"
import "/libs/magnific-popup/magnific-popup.css"
import "/libs/animate/animate.min.css"
import "/css/fonts.css"
import "/css/main.css"
import "/css/skins/purple.css"
import "/css/media.css"

const $ = require("jquery")
window.jQuery=$;

export const onInitialClientRender = () => {
    setTimeout(function() {
        $(".loader_inner").fadeOut();
        $(".loader").delay(400).fadeOut("slow");

        $(".top_text h1").animated("fadeInDown", "fadeOutUp");
        $(".top_text p").animated("fadeInUp", "fadeOutDown");
    }, 400)
}