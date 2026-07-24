const express = require("express");

const atendimentoController = require(
  "../controllers/atendimentoController"
);

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Atendimentos
 *   description: Operações relacionadas aos atendimentos
 */

/**
 * @swagger
 * /api/atendimentos:
 *   get:
 *     summary: Lista todos os atendimentos
 *     tags: [Atendimentos]
 *     responses:
 *       200:
 *         description: Lista de atendimentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Atendimento'
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/", atendimentoController.listar);

/**
 * @swagger
 * /api/atendimentos/{id}:
 *   get:
 *     summary: Busca um atendimento pelo ID
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do atendimento
 *     responses:
 *       200:
 *         description: Atendimento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Atendimento'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Atendimento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/:id", atendimentoController.buscarPorId);

/**
 * @swagger
 * /api/atendimentos:
 *   post:
 *     summary: Cria um novo atendimento
 *     tags: [Atendimentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtendimentoInput'
 *     responses:
 *       201:
 *         description: Atendimento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Atendimento'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.post("/", atendimentoController.criar);

/**
 * @swagger
 * /api/atendimentos/{id}:
 *   put:
 *     summary: Atualiza um atendimento
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do atendimento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtendimentoInput'
 *     responses:
 *       200:
 *         description: Atendimento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Atendimento'
 *       400:
 *         description: Dados ou ID inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Atendimento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.put("/:id", atendimentoController.atualizar);

/**
 * @swagger
 * /api/atendimentos/{id}:
 *   delete:
 *     summary: Exclui um atendimento
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do atendimento
 *     responses:
 *       200:
 *         description: Atendimento excluído com sucesso
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Atendimento não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.delete("/:id", atendimentoController.excluir);

module.exports = router;