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
import { Box, Container, Link, Typography } from '@mui/material';
// import { useParams } from 'react-router-dom';
import FieldComponent from "./FieldComponent.tsx";
import CardComponent from './CardComponent.tsx';
import ResponsiveGridComponent from './ResponsiveGridComponent.tsx';
import ErrorComponent from "./ErrorComponent.tsx";
import ProgressComponent from "./ProgressComponent.tsx";
import { OrderImmutable } from '../models/Order';
import { isUserRegistered } from '../api/users';
import { getLocalStorage, KEY_ENTITYID } from '../api/localstorage';
import { getOrdersByEmail } from "../api/orders.js";
import { PROXY_URL } from '../constants.js';

const OrderComponent = () => {
    const [data, setData] = useState([] as OrderImmutable[]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = getLocalStorage(KEY_ENTITYID)
    console.info(user);

    function ArtifactLinks({ artifact }) {
        const artifactLink = artifact.links.find(link => link.relationship === 'artifact');
        // const metadataLink = artifact.links.find(link => link.relationship === 'metadata');
        // const sampleLink = artifact.links.find(link => link.relationship === 'sample');

        // Temporary until metadata links work
        let metadataLink = artifact.links.find(link => link.relationship === 'metadata');
        if (metadataLink) {
            metadataLink = {...metadataLink, url: `${PROXY_URL}/dataproducts/uuid/${artifact.productuuid}/tmp/${metadataLink.url}`};
        }
        console.log(metadataLink)

        // Temporary until sample links work
        let sampleLink = artifact.links.find(link => link.relationship === 'sample');
        if (sampleLink) {
            sampleLink = {...sampleLink, url: `${PROXY_URL}/dataproducts/uuid/${artifact.productuuid}/tmp/${sampleLink.url}`};
        }
        console.log(sampleLink)

        const openInNewWindow = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
        };

        return (
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
        );
    }

    // Fetching the data from the API
    useEffect(() => {
        const fetchData = async () => {

            console.info(user);

            try {
                setIsLoading(true);

                // Check if user is set
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

                // Get orders for the owner
                const { data: orders, error: ordererror } = await getOrdersByEmail(user.contact.email);
                if (ordererror) {
                    setError(ordererror);
                    setIsLoading(false);
                    return;
                }
                console.log(orders)
                setData(orders);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
                setError(error);
            }
        };

        fetchData();
    }, []);

    const uxSuccess = (orders: OrderImmutable[]) => {
        console.log(orders)
        const title = (orders && orders.length > 0) ? `Orders for ${orders[0].owner}` : "No orders available";

        return(
            <Container maxWidth="xl">
                <Typography variant="h1">
                    Order
                </Typography>

                <Typography variant="h3">
                    {title}
                </Typography>

                <br/>

                {orders.map((order, index) => (
                    <div key={order.uuid}>
                        <br/>
                        <br/>
                        <Typography variant="h5">
                            Order UUID: {order.uuid}
                        </Typography>

                        <FieldComponent fieldName="Owner" fieldValue={order.owner} />
                        <FieldComponent fieldName="Created" fieldValue={order.createtimestamp} />
                        <FieldComponent fieldName="Updated" fieldValue={order.updatetimestamp} />

                        <br/>

                        <Typography variant="h5">
                            Artifacts
                        </Typography>

                        {/*
                        Make the artifact in the order span the page - all
                        screen sizes will use all 12 columns
                        */}
                        <ResponsiveGridComponent size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                            {order.cart.items.map((item, index) => (
                                <CardComponent
                                    key={index}
                                    titles={[item.artifact.name]}>

                                    <FieldComponent fieldName="Product UUID" fieldValue={item.product.uuid} />
                                    <FieldComponent fieldName="Product Namespace" fieldValue={item.product.namespace} />
                                    <FieldComponent fieldName="Product Name" fieldValue={item.product.name} />

                                    <br/>

                                    <FieldComponent fieldName="Artifact UUID" fieldValue={item.artifact.uuid} />
                                    <FieldComponent fieldName="Name" fieldValue={item.artifact.name} />
                                    <FieldComponent fieldName="Description" fieldValue={item.artifact.description} />
                                    <FieldComponent fieldName="Tags" fieldValue={item.artifact.tags.join(', ')} />
                                    <FieldComponent fieldName="License" fieldValue={item.artifact.license} />
                                    <FieldComponent fieldName="Security Policy" fieldValue={item.artifact.securitypolicy} />
                                    <FieldComponent fieldName="createtimestamp" fieldValue={item.artifact.createtimestamp} />
                                    <FieldComponent fieldName="updatetimestamp" fieldValue={item.artifact.updatetimestamp} />
                                    <ArtifactLinks artifact={item.artifact} />

                                </CardComponent>
                            ))}
                        </ResponsiveGridComponent>
                    </div>
                ))}


            </Container>
        )
    };

    const uxLoading = () => {
        return(
            <ProgressComponent />
        )
    };

    const uxError = (error) => {
        return(
            <ErrorComponent error={error}/>
        );
    };


    let orders;
    if (data) {
        console.log(data)
        orders = data;
    }

    return (
        <div>
          { isLoading
            ? uxLoading()
            : error
              ? uxError(error)
              : uxSuccess(orders)
          }
        </div>
    );
};

export default OrderComponent;
