import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, maggieCredentials, testPlacemark, testPlacemarks, testDetails, institution } from "../fixtures.js";

suite("Detail API tests", () => {
  let user = null;
  let secondaryPlacemarks = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllPlacemarks();
    await placemarkService.deleteAllDetails();
    await placemarkService.deleteAllUsers();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    testPlacemark.userid = user._id;
    secondaryPlacemarks = await placemarkService.createPlacemark(testPlacemark);
  });


  teardown(async () => {});

  test("create Detail", async () => {
    const returnedDetail = await placemarkService.createDetail(secondaryPlacemarks._id, institution);
    assertSubset(institution, returnedDetail);
  });

  test("create Multiple Details", async () => {
    for (let i = 0; i < testDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createDetail(secondaryPlacemarks._id, testDetails[i]);
    }
    const returnedDetails = await placemarkService.getAllDetails();
    assert.equal(returnedDetails.length, testDetails.length);
    for (let i = 0; i < returnedDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const detail = await placemarkService.getDetail(returnedDetails[i]._id);
      assertSubset(detail, returnedDetails[i]);
    }
  });

  test("Delete DetailApi", async () => {
    for (let i = 0; i < testDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createDetail(secondaryPlacemarks._id, testDetails[i]);
    }
    let returnedDetails = await placemarkService.getAllDetails();
    assert.equal(returnedDetails.length, testDetails.length);
    for (let i = 0; i < returnedDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const detail = await placemarkService.deleteDetail(returnedDetails[i]._id);
    }
    returnedDetails = await placemarkService.getAllDetails();
    assert.equal(returnedDetails.length, 0);
  });

  test("denormalised Placemark", async () => {
    for (let i = 0; i < testDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createDetail(secondaryPlacemarks._id, testDetails[i]);
    }
    const returnedPlacemark = await placemarkService.getPlacemark(secondaryPlacemarks._id);
    assert.equal(returnedPlacemark.details.length, testDetails.length);
    for (let i = 0; i < testDetails.length; i += 1) {
      assertSubset(testDetails[i], returnedPlacemark.details[i]);
    }
  });
});