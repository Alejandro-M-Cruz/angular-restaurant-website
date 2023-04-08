import express from 'express'
const router = express.Router()

import {firestore} from "../firebase";
import {MenuSection} from "../../app/model/menu-section.model";
import {MultiLanguageString} from "../../app/model/multi-language-string";

router.get('/sections', async (_req, res) => {
  const querySnapshot = await firestore.collection('menu_sections').get()
  res.json(querySnapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  }))
})

router.get('/items', async (_req, res) => {
  const querySnapshot = await firestore.collection('menu_items').get()
  res.json(querySnapshot.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data()
    }
  }))
})

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



export default router
