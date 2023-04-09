import express from 'express'
const router = express.Router()
import {firestore} from "../firebase";
import {MenuSection} from "../../app/model/menu-section.model";
import {MultiLanguageString} from "../../app/model/multi-language-string";
import {MenuItem} from "../../app/model/menu-item.model";

router.post('/sections/new', async (req, res) => {
  const menuSection = {
    name: req.body.name as MultiLanguageString
  } as MenuSection
  await firestore.collection('menu_sections').add(menuSection)
  res.json({})
})

router.put('/sections/:id', async (req, res) => {
  const menuSection = {
    name: req.body.name as MultiLanguageString
  } as MenuSection
  await firestore.doc(`menu_sections/${req.params.id}`).set(menuSection)
  res.json({})
})

router.delete('/sections/:id', async (req, res) => {
  await firestore.doc(`menu_sections/${req.params.id}`).delete()
  const querySnapshot = await firestore.collection('menu_items')
    .where('sectionId', '==', req.params.id).get()
  querySnapshot.forEach(doc => doc.ref.delete())
  res.json({})
})

router.post('/items/new', async (req, res) => {
  const menuItem = {
    name: req.body.name as MultiLanguageString,
    ingredients: req.body.ingredients as MultiLanguageString,
    price: req.body.price,
    sectionId: req.body.sectionId,
    imageUrl: req.body.imageUrl
  } as MenuItem
  await firestore.collection('menu_items').add(menuItem)
  res.json({})
})

router.put('/items/:id', async (req, res) => {
  const menuItem = {
    name: req.body.name as MultiLanguageString,
    ingredients: req.body.ingredients as MultiLanguageString,
    price: req.body.price,
    sectionId: req.body.sectionId,
    imageUrl: req.body.imageUrl
  } as MenuItem
  await firestore.collection('menu_items').add(menuItem)
  res.json({})
})

router.delete('/items/:id', async (req, res) => {
  await firestore.doc(`menu_items/${req.params.id}`).delete()
  res.json({})
})

export default router
