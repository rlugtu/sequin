module Api
    module V1
        class ChargesController < ApplicationController
            protect_from_forgery with: :null_session

            def create
                charge = Charge.new(card_params)

                if review.save
                    render json: ChargeSerializer.new(charge).serialized_json
                else
                    render json: {error: charge.errors.messages}, status: 422
                end
            end

            def destroy
                card = Card.find(params[:id])

                if card.destroy
                    head :no_content
                else
                    render json: {error: card.errors.messages}, status: 422
                end
            end

            private
            def charge_params
                params.require(:review).permit(charge_amount, :card_id)
            end
        end
    end
end