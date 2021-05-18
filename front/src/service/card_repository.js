import axiosInstance from "./axios";


class CardRepository {
    async getCards(useranme, callback){
        const response = await axiosInstance.get('card/')

        const data = response.data;
        const cards = {};
        for (let i = 0; i < data.length; i++) {
            cards[data[i].id] = data[i];
        }
        cards && callback(cards);
    }

    saveCard(username, card) {

    }

    removeCard(username, card) {

    }
}
export default CardRepository;