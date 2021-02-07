class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :availible_balance, :limit

  has_many :charges
end
