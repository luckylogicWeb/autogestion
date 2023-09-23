const {
  apiAutoGestion: { baseUrl },
} = require("../../../config/env");

const { getRequest } = require("../../request");
const createOAuthHeaders = require("./oauth");

const getVehiculesById = async (id) => {
  const url = `${baseUrl}/ag_vehicle/${id}`;
  const { data } = await getRequest(url, createOAuthHeaders(url, "GET"));

  return data;
};

exports.vehicules = async (req, res) => {
  try {
    const url = `${baseUrl}/ag_vehicle`;
    const { data } = await getRequest(url, createOAuthHeaders(url, "GET"));

    const promiseArray = data.map(async ({ vehicle_id }) =>
      getVehiculesById(vehicle_id),
    );

    const cars = await Promise.all(promiseArray);
    res.status(200).json(cars);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.vehiculesById = async (req, res) => {
  try {
    res.status(200).json(getVehiculesById(req.params.id));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};