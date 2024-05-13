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
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from "@mui/material";
import { Product } from '../models/Product';
import FieldComponent from "./FieldComponent.tsx";
import ErrorComponent from "./ErrorComponent.tsx";
import ResponsiveGridComponent from './ResponsiveGridComponent.tsx';
import CardComponent from './CardComponent.tsx';
import ProgressComponent from './ProgressComponent.tsx';
import { isUserRegistered } from '../api/users';
import { getProducts } from '../api/products';
import { getLocalStorage, allLocalStorage, KEY_ENTITYID } from '../api/localstorage';
import SnackbarComponent from "./SnackbarComponent.tsx";

const MarketplaceComponent = () => {
    const [data, setData] = useState([] as Product[]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [redirectMessage, setRedirectMessage] = useState('');

    let navigate = useNavigate();

    const allUsers = allLocalStorage()
    console.info(allUsers);

    const user = getLocalStorage(KEY_ENTITYID)
    console.info(user);

    function redirect() {
        console.log("Redirecting to /login");
        const url = "/login";
        navigate(url);
    }

    const viewProduct = async (productUUID: string) => {
        const url = `/products/${productUUID}`;
        // window.open(url, '_blank');
        navigate(url);
    };

    // Fetching the data from the API
    useEffect(() => {

        console.info(user);

        const fetchData = async () => {
            try {
                console.info("Fetching Data");
                console.info(user);
                setIsLoading(true);

                // Check if user is set; if not, then redirect to login page
                if (!user) {
                    console.log("User has not logged in yet!");
                    setRedirectMessage("You must login before you can proceed");
                    setOpenSnackbar(true);
                    setTimeout(redirect, 2000);

                    console.info("User is not logged in!");
                    setIsLoading(false); // No loading as we're not fetching any data
                    return;  // Skip the rest of the useEffect code block
                }

                // Verify that the user is registered
                console.info("Checking for user registration");
                const { data: isRegistered, error: usererror } = await isUserRegistered(user.role, user.contact.email);
                if (usererror) {
                    setError(usererror);
                    setIsLoading(false);
                    return;
                }
                if (!isRegistered) {
                    setError(new Error(`User is not registered, role:${user.role} email:${user.contact.email}`));
                    setIsLoading(false);
                    return;
                }

                // Get product data
                console.error("Getting product data");
                const { data: products, error: producterror } = await getProducts();
                if (producterror) {
                    setError(producterror);
                    setIsLoading(false);
                    return;
                }
                console.log(products);
                setData(products);

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                // If the API is unavailable, use the sample data
                setIsLoading(false);
                setError(error);
            }
        };

        fetchData();
    }, []);

    const uxSuccess = (products: Product[]) => {
        console.log(products);
        return (
            <Container maxWidth="xl">
                <Typography variant="h1">Marketplace</Typography>
                <ResponsiveGridComponent>
                    {products.map((product, index) => (
                        <CardComponent
                            key={index}
                            titles={[product.namespace, product.name]}
                            buttonConfigs={[
                                { text: "View", onClick: () => viewProduct(product.uuid) }
                            ]} >
                            <FieldComponent fieldName="UUID" fieldValue={product.uuid} />
                            <FieldComponent fieldName="Namespace" fieldValue={product.namespace} />
                            <FieldComponent fieldName="Name" fieldValue={product.name} />
                            <FieldComponent fieldName="Publisher" fieldValue={product.publisher} />
                            <FieldComponent fieldName="Description" fieldValue={getTruncatedText(product.description)} />
                            <FieldComponent fieldName="Tags" fieldValue={product.tags.join(', ')} />
                        </CardComponent>
                    ))}
                </ResponsiveGridComponent>
                <SnackbarComponent
                    message={redirectMessage}
                    open={openSnackbar}
                    handleClose={() => setOpenSnackbar(false)}
                    severity="error"
                />

            </Container>
        );
    };

    const uxLoading = () => {
        return (
            <ProgressComponent />
        );
    };

    const uxError = (error) => {
        return (
            <ErrorComponent error={error} />
        );
    };

    const getTruncatedText = (text: string) => {
        let truncated = text;
        let byteCount = 0;

        if (text.length > 100) {
          truncated = text.substring(0, 100) + "...";
          for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            if (char <= 0x7F) {
              byteCount += 1;
            } else if (char <= 0x7FF) {
              byteCount += 2;
            } else if (char >= 0xD800 && char <= 0xDFFF) {
              // Surrogate pair: These take 4 bytes in UTF-16 and UTF-8
              byteCount += 4;
              i++; // Skip the next character since a surrogate pair is two characters
            } else {
              byteCount += 3;
            }
          }
          truncated += " (" + byteCount + " bytes)";
        }
        return truncated;
    };

    console.log(data);
    let products
    if (data) {
        products = data;
    }

    return (
        <div>
            { isLoading
            ? uxLoading()
            : error
                ? uxError(error)
                : uxSuccess(products)
            }
        </div>

    );
};


export default MarketplaceComponent;
