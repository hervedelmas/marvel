import axios from "axios"

export default {
  async marvelCharacters(skip, limit) {
    let res = await axios.get("http://localhost:8000/marvelCharacters?skip=" + skip + "&limit=" + limit);
    return res.data;
  }
}