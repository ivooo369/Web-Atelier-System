/* eslint-disable react/prop-types */
import { Card, CardContent, Typography, CardActions } from "@mui/material";
import Button from "@mui/material/Button";

export default function Cart({ cartItems, deleteItem }) {
  return (
    <div className="cart-information">
      {cartItems.length === 0 ? (
        <p className="no-orders">Количката е празна.</p>
      ) : (
        cartItems.map((item, index) => (
          <Card key={index} className="purchase-cards">
            <CardContent>
              <Typography variant="body1" color="textSecondary">
                Вътрешна рамка: {item.innerFrame}
              </Typography>
              {item.outerFrame && (
                <Typography variant="body1" color="textSecondary">
                  Външна рамка: {item.outerFrame}
                </Typography>
              )}
              <Typography variant="body1" color="textSecondary">
                Ширина: {item.frameWidth} см
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Височина: {item.frameHeight} см
              </Typography>
              {item.matboard && (
                <>
                  <Typography variant="body1" color="textSecondary">
                    Паспарту: {item.matboard}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    Широчина на паспарту: {item.matboardWidth}
                  </Typography>
                </>
              )}
              {item.glassOption && (
                <Typography variant="body1" color="textSecondary">
                  Стъкло: {item.glassOption}
                </Typography>
              )}
              {item.hangingOption && (
                <Typography variant="body1" color="textSecondary">
                  Окачване: {item.hangingOption}
                </Typography>
              )}
              {item.mirrorOption && (
                <Typography variant="body1" color="textSecondary">
                  Огледало: {item.mirrorOption}
                </Typography>
              )}
              {item.backingOption && (
                <Typography variant="body1" color="textSecondary">
                  Гръб: {item.backingOption}
                </Typography>
              )}
              {item.gobelinStretching && (
                <Typography variant="body1" color="textSecondary">
                  Опъване на гоблен: {item.gobelinStretching}
                </Typography>
              )}
              {item.subframeOption && (
                <Typography variant="body1" color="textSecondary">
                  Подрамка: {item.subframeOption}
                </Typography>
              )}
              <Typography variant="body1" color="textSecondary">
                Брой рамки: {item.framesQuantity}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Единична цена: {item.price} лв.
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Крайна цена:{" "}
                {parseFloat(item.price * item.framesQuantity).toFixed(2)} лв.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteItem(index)}
              >
                Изтрий
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </div>
  );
}
