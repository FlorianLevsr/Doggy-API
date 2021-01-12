-- Revert Doggy-API:00-create-tables from pg

BEGIN;

DROP TABLE "doggyAPI"."account";

DROP TABLE "doggyAPI"."m2m_dog_favorite_food";

DROP TABLE "doggyAPI"."owner";
DROP TABLE "doggyAPI"."breed";
DROP TABLE "doggyAPI"."gender";
DROP TABLE "doggyAPI"."favorite_food";

DROP TABLE "doggyAPI"."dog";

DROP SCHEMA "doggyAPI";

COMMIT;
