import fetch from 'node-fetch';
import { apiError } from '../utils/apiError.js';


const urlFetch = async (en,fac)=>{
    const url = "https://ctengg.amu.ac.in/web/table_result010.php";
    const body = new URLSearchParams();
    body.set('fac', fac);
    body.set('en', en);
    body.set('prog', 'btech');

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Referer': 'https://ctengg.amu.ac.in/web/st_result001.php?prog=btech'
        },
        body: body
    };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new apiError(404, "RpUnit does not respond");
            }
            const htmlString = await response.text();
            if (!htmlString) {
                throw new apiError(501, "Html is not fetched");
            }
            return htmlString;
        } catch (error) {
            throw new apiError(500, "Error with the fetch operation");
        }
    
}

export {urlFetch};