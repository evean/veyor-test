/*
 * API for fetching for image results. The endpoints include the service we want to fetch from.
 * By default the methods fetch one page of results, but we can add pagination or a maximum number
 * of items to fetch.
 */

import { Router } from 'express'
import Flickr from 'flickr-sdk'

export default () => {
	const api = Router()
	const flickr = new Flickr(process.env.FLICKR_API_KEY)

	api.get('/flickr/feed', (req, res) => {
		flickr.photos.getRecent({
			// Include urls of thumbnail and full size images
			extras: 'url_s, url_o'
		}).then((response) => {
			res.json(response.body)
		}).catch((error) => {
			throw error
		})
	})

	api.get('/flickr/search', (req, res) => {
		flickr.photos.search({
			text: req.query.search,
			extras: 'url_s, url_o'
		}).then((response) => {
			res.json(response.body)
		}).catch((error) => {
			throw error
		})
	})

	return api
}
