class CardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :balance, :limit

  has_many :charges
end
