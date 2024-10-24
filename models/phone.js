class Phone {
  static async create ({
    brand,
    model,
    os,
    screen_size,
    ram,
    storage_capacity,
    battery_capacity,
    camera_megapixels,
    price,
    release_date,
    color,
    is_dual_sim,
  }) {
    try {
      const {
        rows: [createdPhone],
      } = await Phone.pool.query(
        `
          INSERT INTO phones (brand,
                              model,
                              os,
                              screen_size,
                              ram,
                              storage_capacity,
                              battery_capacity,
                              camera_megapixels,
                              price,
                              release_date,
                              color,
                              is_dual_sim)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
          RETURNING *
        `,
        [
          brand,
          model,
          os,
          screen_size,
          ram,
          storage_capacity,
          battery_capacity,
          camera_megapixels,
          price,
          release_date,
          color,
          is_dual_sim,
        ]
      );
      return createdPhone;
    } catch (err) {
      throw err;
    }
  }

  static async getAll (limit, offset) {
    try {
      const query = `
        SELECT *
        FROM phones
        ORDER BY id
        LIMIT $1 OFFSET $2
      `;
      const { rows } = await Phone.pool.query(query, [limit, offset]);

      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async getById (phoneId) {
    try {
      const query = `
      SELECT *
      FROM phones
      WHERE id = $1
      `;
      const {
        rows: [foundPhone],
      } = await Phone.pool.query(query, [phoneId]);

      return foundPhone;
    } catch (err) {
      throw err;
    }
  }

  static async updateById ({ brand, model }, phoneId) {
    try {
      const query = `
        UPDATE phones
        SET brand = $1, 
            model = $2
        WHERE id = $3
        RETURNING *
        ;    
      `;

      const {
        rows: [updatedPhone],
      } = await Phone.pool.query(query, [brand, model, phoneId]);

      return updatedPhone;
    } catch (err) {
      throw err;
    }
  }

  static async deleteById (phoneId) {
    try {
      const query = `
      DELETE FROM phones
      WHERE id = $1
      RETURNING 1;
      `;
      const {
        rows: [foundPhone],
      } = await Phone.pool.query(query, [phoneId]);

      return foundPhone;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = Phone;
