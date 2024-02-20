const pool = require('../utils/mysql.connect.js') 

const bcrypt = require("bcrypt")

// ----- Verify Seller -----
const verifyRaffle = async (raffles) => {
  try {
    const connection = await pool.getConnection()

    const regRaffle = []
    const raffleExists = []

    for (const info of raffles) {
      let sql = `SELECT id_raffle FROM raffles WHERE name_raffle = ? ;`
      let [rows] = await connection.execute(sql,[info.name_raffle])

      if (rows.length > 0) {
        raffleExists.push(info)
      } else {
        regRaffle.push(info)
      }
    }

    msg = {
      status: true,
      message: regRaffle.length > 0 ? "New raffles found" : "All raffles already exist",
      code: regRaffle.length > 0 ? 200 : 404,
      info: {
        regRaffle,
        raffleExists
      }
    }

    connection.release()

    return msg
  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Save Seller -----
const regRaffle = async (regRaffles) => {
  try {
    const Rafflescompleted = []
    const RafflesnotCompleted = []
    
    for(const info of regRaffles){
      const { id_boss , name_raffle , description_raffle , awards , img_awards , special_awards , cant_tickets , price_tickets , state_raffle , sector_raffle , sellers_raffle , date_created , end_date , special_date } = info

      const connection = await pool.getConnection()

      let sql = `INSERT INTO raffles ( id_boss , name_raffle , description_raffle , awards , img_awards , special_awards , cant_tickets , tickets_sold , price_tickets , state_raffle , sector_raffle , sellers_raffle , date_created , end_date , special_date , activation_status ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ? , ?, ?);`
      const [result] = await connection.execute(sql, [id_boss , name_raffle , description_raffle , awards , img_awards , special_awards , cant_tickets , [] , price_tickets , state_raffle , sector_raffle , sellers_raffle , date_created , end_date , special_date , 1]);  

      if (result.affectedRows > 0) {
        Rafflescompleted.push({
          status: true,
          message: "Raffle registered successfully",
          raffle: name_raffle 
        })
      } else {
        RafflesnotCompleted.push({
          status: false,
          message: "Raffle not registered successfully",
          raffle: name_raffle 
        })
      }

      connection.release()

    }

    const msg = {
      status: true,
      message: "Raffle registration process completed",
      code: 200,
      completed: Rafflescompleted,
      notCompleted: RafflesnotCompleted
    }

    return msg

  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Get Sellers -----
const getRaffle = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "Raffles not found",
      code: 404
    }

    const connection = await pool.getConnection()

    let sql = `SELECT id_raffle , name_raffle , description_raffle , awards , img_awards , special_awards , cant_tickets , tickets_sold , tickets_sold , price_tickets , state_raffle , sector_raffle , sellers_raffle , date_created , end_date , special_date , activation_status FROM raffles WHERE id_boss = ? ;`
    let [raffle] = await connection.execute(sql,[id_boss])

    if (raffle.length > 0) {
      msg = {
        status: true,
        message: "Raffles found",
        data: raffle,
        code: 200
      }
    }

    connection.release()

    return msg
  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Get Sellers -----
const getRaffleSeller = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "Raffles not found",
      code: 404
    }

    const connection = await pool.getConnection()

    let sql = `SELECT id_boss FROM sellers WHERE id_seller = ? ;`
    let [verify] = await connection.execute(sql,[id_seller])

    if(verify.length > 0) {
      let boss = verify[0].id_boss

      let sql = `SELECT id_raffle , name_raffle , description_raffle , awards , img_awards , special_awards , cant_tickets , tickets_sold , price_tickets , state_raffle , sector_raffle , sellers_raffle , date_created , end_date , special_date, activation_status FROM raffles WHERE id_boss = ? AND activation_status = 1;`
      let [raffle] = await connection.execute(sql,[boss])
  
      if (raffle.length > 0) {
        msg = {
          status: true,
          message: "Raffles found",
          data: raffle,
          code: 200
        }
      }
    }

    connection.release()

    return msg
  } catch (err) {
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

// ----- Edit Raffles -----
const editRaffle = async (raffles) => {
  try {
    const Rafflescompleted = [];
    const RafflesnotCompleted = [];
    
    for (const info of raffles) {
      const { id_raffle, name_raffle, description_raffle, awards, img_awards, special_awards, cant_tickets, price_tickets, state_raffle, sector_raffle, sellers_raffle, date_created, end_date, special_date } = info;

      const connection = await pool.getConnection();

      let sql = 'SELECT id_raffle FROM raffles WHERE id_raffle = ?';
      let [verify] = await connection.execute(sql, [id_raffle]);

      if (verify.length > 0) {
        sql = 'UPDATE raffles SET name_raffle = ?, description_raffle = ?, awards = ?, img_awards = ?, special_awards = ?, cant_tickets = ?, price_tickets = ?, state_raffle = ?, sector_raffle = ?, sellers_raffle = ?, date_created = ?, end_date = ?, special_date = ? WHERE id_raffle = ?';
        const [result] = await connection.execute(sql, [name_raffle, description_raffle, awards, img_awards, special_awards, cant_tickets, price_tickets, state_raffle, sector_raffle, sellers_raffle, date_created, end_date, special_date, id_raffle]);    

        if (result.affectedRows > 0) {
          Rafflescompleted.push({
            status: true,
            message: "Raffle edited successfully",
            raffle: name_raffle
          });
        } else {
          RafflesnotCompleted.push({
            status: false,
            message: "Raffle not edited successfully",
            raffle: name_raffle
          });
        }
      } else {
        RafflesnotCompleted.push({
          status: false,
          message: "Raffle not found",
          raffle: name_raffle
        });
      }

      connection.release();
    }

    const msg = {
      status: true,
      message: "Edit process completed",
      code: 200,
      completed: Rafflescompleted,
      notCompleted: RafflesnotCompleted
    };

    return msg;

  } catch (err) {
    console.log(err);
    const msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    };
    return msg;
  }
};

// ----- Delete Seller -----
const deleteRaffle = async ({ data }) => {
  try {
    let msg = {
      status: false,
      message: "Raffle not deleted",
      code: 500
    }
    
    const connection = await pool.getConnection()
    
    let sql = `SELECT id_raffle FROM raffles WHERE id_raffle = ? ;`
    let [verify] = await connection.execute(sql,[id_raffle])

    if (verify.length > 0) {

      let updateSql = `UPDATE raffles SET activation_status = ? WHERE id_raffle = ?;`;
      const raffle =  await connection.execute(updateSql, [activation_status , id_raffle])

      if (raffle.length > 0 && activation_status == 1) {
        msg = {
          status: true,
          message: "Raffle Activated succesfully",
          code: 200
        }
      }else if (raffle.length > 0 && activation_status == 0) {
        msg = {
          status: true,
          message: "Raffle Disabled succesfully",
          code: 200
        }
      }
    }

    connection.release()

    return msg

  } catch (err) {
    console.log(err)
    let msg = {
      status: false,
      message: "Something went wrong...",
      code: 500,
      error: err,
    }
    return msg
  }
}

module.exports = {
  getRaffle,
  getRaffleSeller,
  verifyRaffle,
  regRaffle,
  editRaffle,
  deleteRaffle
}
