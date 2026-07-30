const express = require("express");
const router = express.Router();

const aiController = require("./aiController");

/**
 * @swagger
 * tags:
 *   name: IA
 *   description: Operações relacionadas à inteligência artificial
 */

/**
 * @swagger
 * /api/ai/analisar:
 *   post:
 *     summary: Envia um texto para análise da IA
 *     tags: [IA]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - texto
 *             properties:
 *               texto:
 *                 type: string
 *                 example: Olá! Quem é você?
 *     responses:
 *       200:
 *         description: Resposta gerada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Resposta gerada com sucesso.
 *                 data:
 *                   type: object
 *                   properties:
 *                     resposta:
 *                       type: string
 *                       example: Olá! Sou um assistente especializado em relatórios.
 *       400:
 *         description: Texto inválido ou não informado
 *       401:
 *         description: Chave da API inválida
 *       429:
 *         description: Limite ou saldo da API indisponível
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/analisar", aiController.analisar);

module.exports = router;