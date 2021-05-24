import axiosInstance from "./axios";


class CardRepository {
    async getCards(callback){
        const response = await axiosInstance.get('card/')

        const data = response.data;

        if(data) {
            const cards = {};
            for (let i = 0; i < data.length; i++) {
                cards[data[i].id] = data[i];
            }
            cards && callback(cards);
        }
      
    }

    async saveCard(card, callback) {
        const response = await axiosInstance.post('card/', {
            card
        })
        const data = response.data;
        if(data) {
            callback(data);
        }

    }

    async deleteCard(cards) {
        const response = await axiosInstance.delete('card/delete/',{
            data: { // 서버에서 req.body.{} 로 확인할 수 있다.
                id : cards
            }
        })
    }
}
export default CardRepository;