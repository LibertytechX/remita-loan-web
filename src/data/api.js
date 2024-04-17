import axios from 'axios'


const apiUrl = 'http://libertyloan-ussd.herokuapp.com/api/remita_filter/'

export const uploadCsvFile = async (data) => {

    try {

        await axios.post(apiUrl + 'file', data)
    } catch (error) {
        throw error;
    }

}