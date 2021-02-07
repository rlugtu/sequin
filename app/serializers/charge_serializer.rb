class ChargeSerializer
  include FastJsonapi::ObjectSerializer
  attributes :charge_amount
  belongs_to :card
end
