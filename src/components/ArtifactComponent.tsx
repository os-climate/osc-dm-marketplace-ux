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
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Link, Typography } from "@mui/material";
import { Artifact } from '../models/Artifact';
import FieldComponent from "./FieldComponent.tsx";
import ProgressComponent from './ProgressComponent.tsx';
import ErrorComponent from './ErrorComponent.tsx';
import SnackbarComponent from './SnackbarComponent.tsx';
import { isUserRegistered } from '../api/users';
import { getLocalStorage, KEY_ENTITYID } from '../api/localstorage';
import { addItemToCart } from "../api/carts.js";
import { getArtifactByUUID } from "../api/artifacts.js";
import { PROXY_URL } from '../constants.js';

const ArtifactComponent = () => {
    const { productuuid, uuid } = useParams<{ productuuid: string, uuid: string }>();
    console.log(productuuid)
    console.log(uuid)

    const user = getLocalStorage(KEY_ENTITYID)
    console.info(user);

    const owner = user.contact.email;
    console.log(owner)

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    // const navigate = useNavigate();

    // Function to handle Add to Cart click
    const handleAddToCart = async (owner: string, productuuid: string, artifactuuid: string) => {
        console.log(`Adding to cart owner:${owner} uuid:${uuid}`)
        try {
            // Add item to cart
            const { data: response, error: carterror } = await addItemToCart(owner, productuuid, artifactuuid);
            if (carterror) {
                setError(carterror);
                setIsLoading(false);
                return;
            }
            console.log(response)

            // Show the Snackbar
            setOpenSnackbar(true);

            // Navigate to another URL, for example, the cart page
            // navigate("/path/to/cart");
        } catch (error) {
            console.error("Error adding to cart: ", error);
            setError(error);
        }
    };

    // Fetching the data from the API
    useEffect(() => {

        console.info(user);

        const fetchData = async () => {
            try {
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
                if (error) {
                    setError(usererror);
                    setIsLoading(false);
                    return;
                }
                if (!isRegistered) {
                    setError(new Error(`User is not registered, role:${user.role} email:${user.contact.email}`));
                    setIsLoading(false);
                    return;
                }

                // Get artifact data
                const { data: artifact, error: artifacterror } = await getArtifactByUUID(productuuid, uuid);
                if (artifacterror) {
                    setError(artifacterror);
                    setIsLoading(false);
                    return;
                }
                console.log(artifact);
                setData(artifact);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
                setError(error);
            }
        };

        fetchData();
    }, [productuuid, uuid]);

    const openInNewWindow = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const uxSuccess = (artifact: Artifact, handleAddToCart: () => void) => {
        console.log(artifact)
        const artifactLink = artifact.links.find(link => link.relationship === 'artifact');
        console.log(artifactLink)

        // Temporary until metadata links work
        let metadataLink = artifact.links.find(link => link.relationship === 'metadata');
        if (metadataLink) {
            metadataLink = {...metadataLink, url: `${PROXY_URL}/dataproducts/uuid/${productuuid}/tmp/${metadataLink.url}`};
        }
        console.log(metadataLink)

        // Temporary until sample links work
        let sampleLink = artifact.links.find(link => link.relationship === 'sample');
        if (sampleLink) {
            sampleLink = {...sampleLink, url: `${PROXY_URL}/dataproducts/uuid/${productuuid}/tmp/${sampleLink.url}`};
        }
        console.log(sampleLink)

        return(
            <Container maxWidth="xl">
                <Typography variant="h1">
                    Artifact
                </Typography>

                <Typography variant="h3">
                    {artifact.name}
                </Typography>

                <br/>

                <Typography variant="h5">
                    Product Information
                </Typography>

                <FieldComponent fieldName="Product UUID" fieldValue={artifact.productuuid} />
                <FieldComponent fieldName="Product Namespace" fieldValue={artifact.productnamespace} />
                <FieldComponent fieldName="Product Name" fieldValue={artifact.productname} />

                <br/>

                <Typography variant="h5">
                    Artifact Information
                </Typography>

                <FieldComponent fieldName="UUID" fieldValue={artifact.uuid} />
                <FieldComponent fieldName="Name" fieldValue={artifact.name} />
                <FieldComponent fieldName="Description" fieldValue={artifact.description} />
                <FieldComponent fieldName="Tags" fieldValue={artifact.tags.join(', ')} />
                <FieldComponent fieldName="License" fieldValue={artifact.license} />
                <FieldComponent fieldName="Security Policy" fieldValue={artifact.securitypolicy} />
                <FieldComponent fieldName="Create Timestamp" fieldValue={artifact.createtimestamp} />
                <FieldComponent fieldName="Update Timestamp" fieldValue={artifact.updatetimestamp} />

                <br/>

                <Typography variant="h6">
                    Links
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    {artifactLink && (
                    <Link href={artifactLink.url} download style={{ cursor: 'pointer', textDecoration: 'none' }}>
                        Download Artifact ({artifactLink.mimetype})
                    </Link>
                    )}
                    {metadataLink && (
                        <Link href="#" onClick={(e) => { e.preventDefault(); openInNewWindow(metadataLink?.url); }} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                            View Metadata ({metadataLink.mimetype})
                        </Link>
                    )}
                    {sampleLink && (
                        <Link href="#" onClick={(e) => { e.preventDefault(); openInNewWindow(sampleLink?.url); }} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                            View Sample Data ({sampleLink.mimetype})
                        </Link>
                    )}
                </Box>
                <Button variant="text" color="primary" onClick={handleAddToCart} > Add to Cart </Button>
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
    };

    console.log(data);
    let artifact
    if (data) {
        artifact = data;
    }

    return (
        <div>
            { isLoading
            ? uxLoading()
            : error
                ? uxError(error)
                : uxSuccess(artifact, () => handleAddToCart(owner, productuuid, artifact.uuid))
            }
            <SnackbarComponent
                message="Item added to cart"
                open={openSnackbar}
                handleClose={() => setOpenSnackbar(false)}
                severity="success"
            />
        </div>

    );
};

export default ArtifactComponent;
