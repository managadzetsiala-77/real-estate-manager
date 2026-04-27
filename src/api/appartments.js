const BACE_URL = "https://api.real-estate-manager.redberryinternship.ge/api";
const token = "a1a4b7f1-0aaf-437d-9e18-adc9b880cd7a";

//Get all cities
export async function getCities() {
  try {
    const res = await fetch(`${BACE_URL}/cities`);

    if (!res.ok) {
      throw new Error("cant fetch cities !");
    }
    const data = await res.json();
    return data;
  } catch (erroe) {
    console.log(error.message);
  }
}

//Get all regions
export async function getRegions() {
  try {
    const res = await fetch(`${BACE_URL}/regions`);
    if (!res.ok) {
      throw new Error("cant fetch regions !");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.err(err.message);
  }
}

export async function getAgents() {
  try {
    const res = await fetch(`${BACE_URL}/agents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("cant fetch agents!");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function createAgent(param) {
  try {
    const res = await fetch(`${BACE_URL}/agents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: param,
    });
    if (!res.ok) {
      throw new Error("cant create agents!");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
}


export async function getAppartments() {
    try {
      const res = await fetch(`${BACE_URL}/real-estates`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw new Error("Cant fetch apartments");
      }
  
      const data = await res.json();
  
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }

  //create appartment
  export async function createAppartment(param) {
    try {
      const res = await fetch(`${BACE_URL}/real-estates`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: param,
      });
      if (!res.ok) {
        throw new Error("cant create appartment!");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }

 export async function getAppartment() {
    try {
      const res = await fetch(`${BACE_URL}/real-estates/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw new Error("Cant fetch apartment");
      }
  
      const data = await res.json();
  
      return data;
    } catch (error) {
      console.error(error.message);
    }
  } 

  export async function deleteAppartments() {
    try {
      const res = await fetch(`${BACE_URL}/real-estates/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw new Error("Cant delete appartment!");
      }
  
      const data = await res.json();
  
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }