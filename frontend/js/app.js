// js/api.js
class StudentAPI {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getAllStudents() {
        try {
            const response = await fetch(`${this.baseURL}/students`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data.students; 
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}

const api = new StudentAPI('http://192.168.1.6:3000/api');