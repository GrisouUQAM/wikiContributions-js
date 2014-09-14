/* 
 * Tout droits réservés à Grisou!
 */

window.Grisou = window.Grisou || {};
Grisou.WikiHelper = Grisou.WikiHelper || {};

// ====================
// Wikihelper module
// ====================
Grisou.WikiHelper = (function () {

// private
    var self = Grisou.WikiHelper;
    var apiUrl = '';
    var RSD_KEYWORD = "EditURI";
    
//public

    self.getApiUrlPath = function() {
        return apiUrl;
    }


    self.setApiUrlPath = function (url) {
        if ( url.substr(0,7) !== 'http://' ) {
            apiUrl = 'http://' + url;
        } 
        if ( apiUrl !== 'http://wiki.grisou.ca') {
            apiUrl = apiUrl + '/w/api.php';
        } else {
            apiUrl = apiUrl + '/api.php';
        }
        // verifie si existe dans la bd
        // fais un appel ajax pour obtenir le fichier index.html
        // trouver la ligne qui contient le rel=RSD_KEYWORD
        // extirper le URL de l"API et le retourner.
        return apiUrl;
    };
    
    
    return self;

}( Grisou.WikiHelper = Grisou.WikiHelper || {} ));