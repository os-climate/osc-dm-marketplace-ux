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
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import FieldComponent from "./FieldComponent.tsx";
import ResponsiveGridComponent from './ResponsiveGridComponent.tsx';
import CardComponent from './CardComponent.tsx';
import ErrorComponent from './ErrorComponent.tsx';
import { Product } from '../models/Product';
import ProgressComponent from './ProgressComponent.tsx';
import { isUserRegistered } from '../api/users';
import { getLocalStorage, KEY_ENTITYID } from '../api/localstorage';
import { getProductDetailsByUUID } from "../api/products.js";

const ProductComponent = () => {
    const { uuid } = useParams<{ uuid: string }>();
    console.log(uuid)

    const [data, setData] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    let navigate = useNavigate();

    const user = getLocalStorage(KEY_ENTITYID)
    console.info(user);

    // Fetching the data from the API
    useEffect(() => {

        const fetchData = async () => {
            try {

                console.info(user);

                setIsLoading(true);

                // Check if userId is set
                if (!user) {
                    const error = new Error("User has not logged in yet!");
                    setError(error);
                    setIsLoading(false); // No loading as we're not fetching any data
                    return;  // Skip the rest of the useEffect code block
                }

                // Verify that the user is registered
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

                // Get product summary (not needed?)
                // const { data: product, error: productError } = await getProductByUUID(uuid);
                // if (productError) {
                //     setError(productError);
                //     setIsLoading(false);
                //     return;
                // }
                // console.log(product);

                // Get product summary (not needed?)
                const { data: productDetails, error: productDetailsError } = await getProductDetailsByUUID(uuid);
                if (productDetailsError) {
                    setError(productDetailsError);
                    setIsLoading(false);
                    return;
                }
                console.log(productDetails);

                setData(productDetails);

                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
                setError(error);
            }
        };

        fetchData();
    }, [uuid]);

    const viewArtifact = async (productUUID: string, artifactUUID: string) => {
        const url = `/artifacts/${productUUID}/${artifactUUID}`;
        console.log(url);
        // window.open(url, '_blank');
        navigate(url);
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
    }

    const uxSuccess = (product: Product, artifacts) => {
        console.log(product);
        console.log(artifacts);
        return(
            <Container maxWidth="xl">
                <Typography variant="h1">
                    Product
                </Typography>

                <Typography variant="h3">
                    {product.namespace} / {product.name}
                </Typography>

                <FieldComponent fieldName="UUID" fieldValue={product?.uuid ?? "unknown" } />
                <FieldComponent fieldName="Address" fieldValue={product?.address ?? "unknown" } />
                <FieldComponent fieldName="Namespace" fieldValue={product?.namespace ?? "unknown" } />
                <FieldComponent fieldName="Name" fieldValue={product?.name ?? "unknown" } />
                <FieldComponent fieldName="Publisher" fieldValue={product?.publisher ?? "unknown" } />
                <FieldComponent fieldName="Description" fieldValue={product?.description ?? "unknown" } />
                <FieldComponent fieldName="Tags" fieldValue={product?.tags.join(', ') ?? "unknown" } />
                <FieldComponent fieldName="createtimestamp" fieldValue={product?.createtimestamp ?? "unknown" } />
                <FieldComponent fieldName="updatetimestamp" fieldValue={product?.updatetimestamp ?? "unknown" } />

                <br/>

                <Typography variant="h5">
                    Artifacts
                </Typography>

                <ResponsiveGridComponent>
                    {artifacts.map((artifact, index) => (
                        <CardComponent
                            key={artifact.uuid}
                            titles={[artifact.name]}
                            buttonConfigs={[
                                { text: "View", onClick: () => viewArtifact(product.uuid, artifact.uuid) }
                            ]}>
                            <FieldComponent fieldName="UUID" fieldValue={artifact.uuid} />
                            <FieldComponent fieldName="Product UUID" fieldValue={artifact.productuuid} />
                            <FieldComponent fieldName="Name" fieldValue={artifact.name} />
                            <FieldComponent fieldName="Description" fieldValue={getTruncatedText(artifact.description)} />
                            <FieldComponent fieldName="Tags" fieldValue={artifact.tags.join(', ')} />

                        </CardComponent>
                    ))}
                </ResponsiveGridComponent>
            </Container>
        )
    }

    const uxLoading = () => {
        return (
            <ProgressComponent />
        );
    };

    const uxError = (error) => {
        return(
            <ErrorComponent error={error}/>
        );
    }

    console.log(data);
    let product, artifacts;
    if (data) {
        product = data.product;
        console.log(product);
        artifacts = data.artifacts;
        console.log(artifacts);
    }

    return (
        <div>
          { isLoading
            ? uxLoading()
            : error
              ? uxError(error)
              : uxSuccess(product, artifacts)
          }
        </div>
    );
};

export default ProductComponent;
