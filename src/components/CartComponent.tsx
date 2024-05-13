/*
 * Copyright 2024 Broda Group Software Inc.
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * Created:  2024-04-15 by eric.broda@brodagroupsoftware.com
 */


import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from '@mui/material';
// import { useParams } from 'react-router-dom';
import FieldComponent from "./FieldComponent.tsx";
import ResponsiveGridComponent from './ResponsiveGridComponent.tsx';
import CardComponent from './CardComponent.tsx';
import ErrorComponent from './ErrorComponent.tsx';
import ProgressComponent from './ProgressComponent.tsx';
import { Cart } from '../models/Cart';
import { Artifact } from '../models/Artifact';
import { Order } from '../models/Order';
import { isUserRegistered } from '../api/users';
import { createOrder } from '../api/orders';
import { getCartByOwner, removeItemFromCart } from '../api/carts';
import { getArtifactByUUID } from '../api/artifacts';
import { getLocalStorage, KEY_ENTITYID } from '../api/localstorage';

const CartComponent = () => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = getLocalStorage(KEY_ENTITYID)
    console.info(user);

    const xowner = user.contact.email;

    // Fetching the data from the API
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        console.info(user);

        try {

            setIsLoading(true);

            // Check if userId is set
            if (!user) {
                setError(new Error("User has not logged in yet!"));
                setIsLoading(false); // No loading as we're not fetching any data
                return;  // Skip the rest of the useEffect code block
            }

            const { data: isRegistered, error: usererror } = await isUserRegistered(user.role, user.contact.email);
            console.log(isRegistered)
            console.log(usererror)
            if (usererror) {
                setError(new Error(`Error checking user registration: ${usererror.message}`));
                setIsLoading(false);
                return;
            }
            if (!isRegistered) {
                setError(new Error(`User is not registered, role:${user.role} email:${user.contact.email}`));
                setIsLoading(false);
                return;
            }

            // Get cart data
            const { data: cart, error: carterror } = await getCartByOwner(xowner);
            if (carterror) {
                setError(new Error(`Error getting cart for owner:${xowner}, error:${carterror.message}`));
                setIsLoading(false);
                return;
            }
            console.info(cart);

            const artifacts = [];
            for (const item of cart.items) {
                console.info(item);
                const productuuid = item.product_uuid
                console.info(productuuid);
                const artifactuuid = item.artifact_uuid
                console.info(artifactuuid);

                // Get artifact data
                const { data: artifact, error: artifacterror } = await getArtifactByUUID(productuuid, artifactuuid);
                if (artifacterror) {
                    setError(new Error(`Error getting artifact for uuid:${artifactuuid}, error:${artifacterror.message}`));
                    setIsLoading(false);
                    return;
                }
                console.info(artifact);
                artifacts.push(artifact);

            };
            console.info(cart);
            console.info(artifacts);
            setData({
                "cart": cart,
                "artifacts": artifacts,
            });
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setError(error);
        }
    };

    const viewArtifact = async (artifactUUID: string) => {
        const url = `/artifacts/${artifactUUID}`;
        window.open(url, '_blank');
    };

    const removeArtifact = async (cartSubscriber: string, productUUID: string, artifactUUID: string) => {
        try {
            console.log(cartSubscriber)
            console.log(artifactUUID)

            // Remove cart item
            const { data: response, error: carterror } = await removeItemFromCart(cartSubscriber, productUUID, artifactUUID);
            if (carterror) {
                setError(new Error(`Error removing item:${artifactUUID} from cart cartSubscriber:${cartSubscriber}, error:${carterror.message}`));
                setIsLoading(false);
                return;
            }
            console.log(response)

            fetchData();
        } catch (error) {
            console.error('Error removing artifact:', error);
            // Handle error here, perhaps by showing an error message to the user.
            setError(error);
        }
    };

    const orderCart = async (cartOwner: string, cartUUID: string) => {
        try {
            console.log(cartOwner)

            // Create an Order object
            const order: Order = {
                owner: cartOwner,
                cartuuid: cartUUID,
            };
            const { data: response, error: ordererror } = await createOrder(order);
            if (ordererror) {
                setError(new Error(`Error creating order:${order}, error:${ordererror.message}`));
                setIsLoading(false);
                return;
            }
            console.log(response)

            fetchData();

        } catch (error) {
            console.error('Error removing artifact:', error);
            // Handle error here, perhaps by showing an error message to the user.
            setError(error);
        }
    };

    const uxSuccess = (cart: Cart, artifacts: Artifact[]) => {
        console.log(cart)
        console.log(artifacts)
        return(
            <Container maxWidth="xl">
                <Typography variant="h1">
                    Cart
                </Typography>
                <Typography variant="h5">
                    Cart for {cart.subscriber}
                </Typography>

                <FieldComponent fieldName="UUID" fieldValue={cart.uuid} />
                <FieldComponent fieldName="Owner (Subscriber)" fieldValue={cart.subscriber} />
                <FieldComponent fieldName="Created" fieldValue={cart.createtimestamp} />
                <FieldComponent fieldName="Updated" fieldValue={cart.updatetimestamp} />

                <br/>

                <Typography variant="h5">
                    Items in Cart
                </Typography>

                <ResponsiveGridComponent>
                    {artifacts.length === 0 ? (
                        <Box>
                            <br/>
                            <Typography variant="body1">
                                [No items in cart]
                            </Typography>
                        </Box>
                    ) : (
                        artifacts.map((artifact, index) => (
                            <CardComponent
                                key={index}
                                titles={[artifact.name]}
                                buttonConfigs={[
                                    { text: "Order cart", onClick: () => orderCart(cart.subscriber, cart.uuid) },
                                    { text: "Remove from Cart", onClick: () => removeArtifact(cart.subscriber, artifact.productuuid, artifact.uuid) },
                                    { text: "View", onClick: () => viewArtifact(artifact.uuid) },
                                ]}>

                                <FieldComponent fieldName="Product UUID" fieldValue={artifact.productuuid} />
                                <FieldComponent fieldName="Artifact UUID" fieldValue={artifact.uuid} />
                                <FieldComponent fieldName="Name" fieldValue={artifact.name} />
                                <FieldComponent fieldName="Description" fieldValue={artifact.description} />
                                <FieldComponent fieldName="Tags" fieldValue={artifact.tags.join(', ')} />
                                <FieldComponent fieldName="createtimestamp" fieldValue={artifact.createtimestamp} />
                                <FieldComponent fieldName="updatetimestamp" fieldValue={artifact.updatetimestamp} />

                            </CardComponent>
                        ))
                    )}
                </ResponsiveGridComponent>

            </Container>
        )
    };

    const uxLoading = () => {
        return (
            <ProgressComponent />
        );
    };

    const uxError = (error) => {
        return(
            <ErrorComponent error={error}/>
        );
    };

    let cart, artifacts;
    if (user && data) {
        console.log(data);
        cart = data.cart;
        console.log(cart);
        artifacts = data.artifacts;
        console.log(artifacts);
    }
    console.log(cart);
    console.log(artifacts);

    return (
        <div>
          { isLoading
            ? uxLoading()
            : error
              ? uxError(error)
              : uxSuccess(cart, artifacts)
          }
        </div>
    );
};

export default CartComponent;
