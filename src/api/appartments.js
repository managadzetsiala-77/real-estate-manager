const BACE_URL = "https://api.real-estate-manager.redberryinternship.ge/api";
const token = "a1a4b7f1-0aaf-437d-9e18-adc9b880cd7a";
const headers = { Authorization: `Bearer ${token}`,

}
//Get all cities
export async function getCities() {
 
    const res = await fetch(`${BACE_URL}/cities`);
    trowError
    return res.json()
   
}

//Get all regions
export async function getRegions() {
  
    const res = await fetch(`${BACE_URL}/regions`);
    trowError
    return res.json()
  }
  

export async function getAgents() {
 
    const res = await fetch(`${BACE_URL}/agents`, {
      method: "GET",
     headers,
    });
    trowError
    return res.json()
  
}

export async function createAgent(param) {
    const res = await fetch(`${BACE_URL}/agents`, {
      method: "POST",
     headers,
      body: param,
    });
    trowError
    return res.json()
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
      const res = await fetch(`${BACE_URL}/real-estates`, {
        method: "POST",
        headers,
        body: param,
      });
      trowError
      return res.json()
   
  }

 export async function getAppartmentById(id) {
   
      const res = await fetch(`${BACE_URL}/real-estates/${id}`, {
        method: "GET",
        headers,
      });
      trowError
      
      return res.json()
 }

  export async function deleteAppartments(id) {
   
      const res = await fetch(`${BACE_URL}/real-estates/${id}`, {
        method: "DELETE",
        headers,
      });
  
      trowError
  
      return res.json()
  }
  function trowError(response) {
    if (!response.ok) {
      throw new Error("Something went wrong !!!");
    }
  }