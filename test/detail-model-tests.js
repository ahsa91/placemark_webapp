import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testPlacemarks, testDetails, institution, testPlacemark, college, testUsers } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Detail Model tests", () => {

  let institutionList = null;

  setup(async () => {
    db.init("mongo");
    await db.placemarkStore.deleteAllPlacemarks();
    await db.detailStore.deleteAllDetails();
    institutionList = await db.placemarkStore.addPlacemark(institution);
    for (let i = 0; i < testDetails.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testDetails[i] = await db.detailStore.addDetail(institutionList._id, testDetails[i]);
    }
  });

  test("create single detail", async () => {
    const testPlacemarkList = await db.placemarkStore.addPlacemark(testPlacemark);
    const detail = await db.detailStore.addDetail(testPlacemarkList._id, college)
    assert.isNotNull(detail._id);
    assertSubset (college, detail);
  });

  test("get multiple details", async () => {
    const details = await db.detailStore.getDetailsByPlacemarkId(institutionList._id);
    assert.equal(details.length, testDetails.length)
  });

  test("delete all details", async () => {
    const details = await db.detailStore.getAllDetails();
    assert.equal(testDetails.length, details.length);
    await db.detailStore.deleteAllDetails();
    const newDetails = await db.detailStore.getAllDetails();
    assert.equal(0, newDetails.length);
  });

  test("get a detail - success", async () => {
    const testPlacemarkList = await db.placemarkStore.addPlacemark(testPlacemark);
    const detail = await db.detailStore.addDetail(testPlacemarkList._id, college)
    const newDetail = await db.detailStore.getDetailById(detail._id);
    assertSubset (college, newDetail);
  });

  test("delete One Detail - success", async () => {
    await db.detailStore.deleteDetail(testDetails[0]._id);
    const details = await db.detailStore.getAllDetails();
    assert.equal(details.length, testPlacemarks.length - 1);
    const deletedDetail = await db.detailStore.getDetailById(testDetails[0]._id);
    assert.isNull(deletedDetail);
  });

  test("get a detail - bad params", async () => {
    assert.isNull(await db.detailStore.getDetailById(""));
    assert.isNull(await db.detailStore.getDetailById());
  });

  test("delete one detail - fail", async () => {
    await db.detailStore.deleteDetail("bad-id");
    const details = await db.detailStore.getAllDetails();
    assert.equal(details.length, testPlacemarks.length);
  });
});
