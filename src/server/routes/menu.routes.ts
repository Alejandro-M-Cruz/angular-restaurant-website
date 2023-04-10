import express from 'express'
const router = express.Router()
import {firestore} from "../firebase";
import {MenuSection} from "../../app/model/menu-section.model";
import {MenuItem} from "../../app/model/menu-item.model";

const extractMenuSection = (object: any): MenuSection => {
  return {
    name: { es: object.name.es, en: object.name.en }
  } as MenuSection
}

const extractMenuItem = (object: any): MenuItem => {
  return {
    name: { es: object.name.es, en: object.name.en },
    ingredients: { es: object.ingredients.es, en: object.ingredients.en },
    price: object.price,
    sectionId: object.sectionId,
    imageUrl: object.imageUrl
  } as MenuItem
}

router.post('/sections/new', async (req, res) => {
  try {
    const menuSection = extractMenuSection(req.body)
    const docRef = await firestore.collection('menu_sections').add(menuSection)
    res.json({id: docRef.id})
  } catch (e: any) {
    console.error(e)
    res.json({error: e.code})
  }
})

router.put('/sections/:id', async (req, res) => {
  try {
    const menuSection = extractMenuSection(req.body)
    await firestore.doc(`menu_sections/${req.params.id}`).set(menuSection)
    res.json({})
  } catch (e: any) {
    res.json({error: e.code})
  }
})

router.delete('/sections/:id', async (req, res) => {
  try {
    await firestore.doc(`menu_sections/${req.params.id}`).delete()
    const querySnapshot = await firestore.collection('menu_items')
      .where('sectionId', '==', req.params.id).get()
    querySnapshot.forEach(doc => doc.ref.delete())
    res.json({})
  } catch (e: any) {
    res.json({error: e.code})
  }
})

router.post('/items/new', async (req, res) => {
  try {
    const docRef = await firestore.collection('menu_items').add(extractMenuItem(req.body))
    res.json({id: docRef.id})
  } catch (e: any) {
    res.json({error: e.code})
  }
})

router.put('/items/:id', async (req, res) => {
  try {
    await firestore.collection('menu_items').add(extractMenuItem(req.body))
    res.json({})
  } catch (e: any) {
    res.json({error: e.code})
  }
})

router.delete('/items/:id', async (req, res) => {
  try {
    await firestore.doc(`menu_items/${req.params.id}`).delete()
    res.json({})
  } catch (e: any) {
    res.json({error: e.code})
  }
})

export default router
