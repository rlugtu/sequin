module Api
    module V1
        class CardsController < ApplicationController
            protect_from_forgery with: :null_session
            def index
                cards = Card.all

                render json: CardSerializer.new(cards, options).serialized_json
            end
      
            def show
                
                card = Card.find(params[:slug])

                render json: CardSerializer.new(card, options).serialized_json
            end

            def create
                card = Card.new(card_params)

                if card.save
                    render json: CardSerializer.new(card).serialized_json
                else
                    render json: {error: card.errors.messages}, status: 422
                end
            end

            def update
                card = Card.find(params[:slug])
                
                if card.update(card_params)
                    render json: CardSerializer.new(card, options).serialized_json
                else
                    render json: {error: card.errors.messages}, status: 422
                end
            end


            def destroy
                card = Card.find(params[:slug])

                if card.destroy
                    head :no_content
                else
                    render json: {error: card.errors.messages}, status: 422
                end
            end

            private
            def card_params
                params.require(:card).permit(:id,:name, :limit, :availible_balance)
            end
            
            def options
                @options ||= {include: %i[charges]}
            end
        end
    end
end