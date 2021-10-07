import { Request, Response } from 'express';
import { authReq } from '../interfaces/token.interface';
import { asyncRunner } from '../utils/async';
const axios = require("axios").default;
export default class RestaurantsService {
    
    /**
     * Obtiene la lista de restaurantes del api público (No funciona en todo el mundo) dadas unas coordenadas y un radio en km
     * @param req 
     * @param res 
     * @returns la lista de restaurantes
     */
    getRestaurants = async (req: authReq, res: Response) => {
        return asyncRunner(req, res, async (req: Request, res: Response) => {
            let latUser = req.body.lat;
            let longUser = req.body.long;
            var options = {
                method: 'GET',
                url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
                params: {
                  latitude: latUser,
                  longitude: longUser,
                  limit: '20',
                  currency: 'USD',
                  distance: req.body.distance,
                  open_now: 'false',
                  lunit: 'km',
                  lang: 'en_US'
                },
                headers: {
                  'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                  'x-rapidapi-key': 'deaf7f7f65msh12b32af5fe94b92p19b0e3jsne1bd4bb06080'
                }
              };

        let response = await axios(options);
        let restaurants = response.data.data
        res.send({
            rta: restaurants

        });
    });

};
}
