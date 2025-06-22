orders
  .slice().reverse()
  .flatMap(order =>
    order.items.map((item, index) => (
      <OrderedProduct
        key={`${order._id}-${index}`}
        id={item.productId}
        image={item.image}
        title={item.name}  // Make sure it's .name
        price={item.price}
        totalAmount={order.totalAmount} // total paid for the order
        quantity={item.quantity}
        deliveryDate={order.deliveryDate}
        rating={item.rating || 4}
        badge_id={item.badge_id || "eco123"}
      // Optional: add onReturn/onReview/onReturnBox handlers if needed
      />
    ))
  )
