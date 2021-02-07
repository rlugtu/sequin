module Api
    module V1
        class ChargesController < ApplicationController
            protect_from_forgery with: :null_session

            def create
                charge = card.charges.new(charge_params)
            
                # if((:card.availible_balance) - :charge_amount > 0) 
                #     charge.save
                #     render json: ChargeSerializer.new(charge).serialized_json
                
                # else
                # render json: {error: charge.errors.messages}, status: 422

                # end
                if charge.save
                    render json: ChargeSerializer.new(charge).serialized_json
                else
                    render json: {error: charge.errors.messages}, status: 422
                end
            end

            def destroy
                charge = Charge.find(params[:id])

                if charge.destroy
                    head :no_content
                else
                    render json: {error: card.errors.messages}, status: 422
                end
            end

            private
            def card
                @card ||=Card.find(params[:card_id])
            end
            def charge_params
                params.require(:charge).permit(:charge_amount, :card_id)
            end
        end
    end
end