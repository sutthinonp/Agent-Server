const db = require('../config/db');

exports.insertAgentSupport = async (req, res) => {
    const {
        agent_id,
        team,
        owner,
        emp_name,
        phone,
        job_position,
        id_card,
        date_out,
        emp_type,
        remark,
        status
    } = req.body;

    try {
        const [result] = await db.query(
            `INSERT INTO agent_support (agent_id, team, owner, emp_name, phone, job_position, id_card, date_out, emp_type, remark, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [agent_id, team, owner, emp_name, phone, job_position, id_card, date_out, emp_type, remark, status]
        );
        res.status(201).json({ message: "ok", result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAgentData = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM agent_support');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAgentSupport = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM agent_support WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Record not found' });
        }

        res.status(200).json({ message: 'ok' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
