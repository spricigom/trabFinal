import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjBiODYzODU0YmI0OTE0MTAwNGI1MjljNzYzYTEyNCIsIm5iZiI6MTczMjI5NjA5OS43Njc3ODMyLCJzdWIiOiI2NzQwYmI1MmYwZjJlZDhmOTg1MWRkZGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Lb2iHKQ7wIcxEzins11gHtC9IK-KfvTiBkBArfFSd98`,
  },
});

export default api;