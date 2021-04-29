const { RESTDataSource } = require('apollo-datasource-rest');

class CourseAPI extends RESTDataSource {
    // https://uoft-courseapi.herokuapp.com/get/CSC369H1
  constructor() {
    super();
    this.baseURL = 'https://uoft-courseapi.herokuapp.com/';
  }

  async getCourse(id) {
    return this.get(`/get/${id}`);
  }
}

module.exports = CourseAPI;
