<template>
  <!-- TODO: move layout to route meta -->
  <ClassicLayout>
    <template #header>
      <BaseHeader @iconClicked="isDrawerOpenUpdate(true)">
        <template #icon>
          <IconMenu class="h-6 w-6 fill-current text-white text-opacity-high" />
        </template>
        <template #menu-drawer>
          <MenuDrawerPanel :tenantSlug="tenantSlug" />
        </template>
        <template #end>
          <div class="flex w-full justify-end">
            <router-link v-if="isAuthenticated" :to="{ name: 'MyAccount' }">
              <BaseAvatar width="w-10" height="h-10" />
            </router-link>
            <router-link
              v-if="!isAuthenticated"
              :to="{ name: 'Login' }"
              class="uppercase text-secondary"
            >
              Log In
            </router-link>
          </div>
        </template>
      </BaseHeader>
    </template>
    <template #content>
      <div class="mx-auto max-w-sm lg:max-w-lg">
        content goes here Lorem ipsum, dolor sit amet consectetur adipisicing
        elit. Porro aut animi dicta dolores eius facere esse, minus rerum
        voluptatibus ut facilis ducimus culpa consequuntur amet repellendus
        quisquam sapiente sit sint veniam! Nisi ratione numquam, blanditiis in
        iste rem voluptatem temporibus vero voluptates suscipit dignissimos
        consectetur velit perspiciatis tenetur libero ex earum nulla distinctio
        inventore tempora molestiae ipsum quia fugiat? Mollitia est inventore
        impedit minima harum ipsa odit aperiam, cumque similique quisquam animi
        debitis quaerat ab odio consequatur dolorum numquam laudantium placeat
        velit fuga porro assumenda ex sint minus. Facere, quis? Amet impedit,
        mollitia minus alias quam dolore consequatur ipsa maxime tempore sequi
        repellat voluptatibus iusto consequuntur, fuga doloremque ab placeat
        incidunt quos, optio quisquam? Nemo laboriosam incidunt natus molestias
        officia? Vitae unde beatae delectus, minus hic quasi voluptate soluta
        praesentium nulla aliquam suscipit aliquid, consequuntur optio
        distinctio culpa officiis quibusdam aperiam placeat fuga. Ipsam in
        recusandae distinctio excepturi non voluptates fugit architecto velit!
        Quas minus nulla maiores qui delectus, debitis, perferendis quasi illo
        nostrum libero, magni cupiditate ipsam est iste soluta ex. Et corporis
        qui voluptatem modi a nam harum impedit, sit perspiciatis corrupti natus
        architecto dolorem quis quibusdam beatae dolorum, commodi voluptatibus
        cumque voluptatum iusto. Explicabo, culpa vero reiciendis sed non
        eveniet, enim neque, modi eum ipsam dicta nobis ipsum magni numquam
        totam necessitatibus. Nesciunt magnam ducimus dolorum est. Voluptates
        sunt voluptatibus debitis quibusdam ad, neque hic tenetur a, nostrum
        molestiae et possimus. Consequatur reiciendis recusandae consequuntur
        iusto ea, iste quia tempora blanditiis, numquam officia laborum error
        eligendi odio fugit eveniet explicabo aperiam neque illo laudantium
        ipsum veniam dolore nulla adipisci enim! Vel pariatur vitae, incidunt
        reiciendis ullam rerum debitis molestias et id ipsa temporibus dolorem
        ab mollitia numquam saepe doloribus nam ex porro voluptas modi fuga sint
        cum, veniam voluptatibus. Voluptatem accusamus minus officia odit dolor
        magnam cupiditate. Vero dicta perferendis natus voluptatum eos,
        provident tenetur ut ea ratione amet enim rem, illum quo tempora
        nesciunt. Neque vitae obcaecati voluptates, corrupti molestiae
        recusandae architecto? Libero possimus repudiandae accusamus quo maiores
        cupiditate, quaerat veniam reiciendis! Facere, facilis, aspernatur
        quibusdam sit aliquam minus aut pariatur sunt nostrum maxime deleniti
        molestiae voluptates rerum sequi. Nobis, enim soluta perferendis totam
        tenetur eveniet delectus neque odio sit cum repellat! Nostrum porro
        ratione et illum excepturi consequatur labore cumque. Illo provident,
        incidunt nam deserunt cupiditate quos culpa enim modi dolor voluptatem
        deleniti voluptate quidem saepe cumque distinctio quisquam fugit
        similique repudiandae quasi. Sit dolores ratione dolorum iure, ducimus
        ad et sapiente iste dicta, inventore officia perferendis quo nostrum
        tenetur a libero temporibus veniam beatae. Ad eos voluptatum sit natus
        voluptates quo voluptas laudantium amet dolorem laborum cum consequuntur
        quasi dolores dolore accusantium, neque ducimus molestias cupiditate
        quos aperiam aspernatur nesciunt. Odit repudiandae dolorum aut neque,
        tempora dolor et quaerat minima similique quam quisquam est rerum
        expedita! Numquam omnis placeat alias inventore quia incidunt iure
        aperiam cumque. Repudiandae, nisi adipisci nulla nihil nemo laborum
        minima rem quod unde tenetur magni reiciendis, illo aspernatur fugiat
        voluptate sit ab nesciunt veritatis quia quae molestias obcaecati
        officiis suscipit. Cupiditate distinctio ullam aut rerum, magnam
        pariatur aliquam earum, odit esse, dolore voluptatum. Sapiente at
        voluptate dignissimos saepe quod cumque ducimus error ullam, dolore modi
        culpa consectetur adipisci ea iusto doloribus quidem dolores quisquam
        vero magni reiciendis magnam minima voluptates? Enim distinctio
        consequuntur atque, numquam et, sit unde placeat odit dicta veniam
        corrupti id pariatur quibusdam ex cumque, ullam eum iste? Saepe mollitia
        molestiae voluptatem porro distinctio numquam recusandae, molestias est
        velit, eius unde, animi voluptate sunt qui suscipit debitis nostrum.
        Eligendi vel architecto enim sequi dolores ratione voluptates neque in
        cumque cum totam atque corrupti, magnam commodi iusto. Consectetur,
        veniam odit quaerat hic assumenda quam, nesciunt repellendus incidunt
        nihil tempora facilis, suscipit doloremque doloribus fugit aspernatur
        qui ea! Tempore perferendis, expedita placeat minus ad recusandae
        blanditiis ducimus deserunt iure assumenda harum sunt odit nulla numquam
        facilis aut nihil repudiandae porro accusamus rerum velit adipisci nemo
        fugit? Assumenda, quae quos eligendi iure iusto et cum, consectetur
        deleniti, illo similique in error tenetur ad facilis consequuntur
        soluta? Culpa molestias similique tempora explicabo ducimus vitae
        dolores in iure. Eaque assumenda a nulla, sequi repudiandae quo quam
        facilis optio? Accusamus error officiis officia facilis, ut numquam
        perspiciatis, harum dicta porro consectetur deleniti cupiditate
        asperiores ab vel iusto animi! Repellat vero magni, tenetur, unde ea
        quod delectus voluptatum impedit facere quaerat aspernatur itaque, nobis
        necessitatibus! Nam eveniet nihil fugit numquam. Hic consectetur
        veritatis ut sed pariatur numquam est aperiam ipsum, amet aspernatur
        sunt? Qui illo et, dolor beatae iusto voluptatem deleniti magni, sequi
        iste placeat mollitia, quasi maxime earum eum voluptates tempora quod
        animi temporibus provident vel. Neque, assumenda. Eum dicta vel numquam
        beatae repellat cupiditate, nihil modi harum? Libero et nostrum
        repellendus, ratione atque laborum exercitationem rem iste porro. Vero
        officiis placeat tempore commodi sint! Mollitia doloremque accusantium
        dignissimos molestias ab dolorem tempore ipsum nihil, assumenda nam,
        velit eius eligendi nisi sit, ullam odio ipsam? Id labore vero amet
        libero rem necessitatibus molestiae fugiat culpa deserunt ducimus
        distinctio enim debitis nemo temporibus excepturi maiores, hic quae
        doloribus veniam facilis! Delectus recusandae hic vel quisquam
        voluptatibus repellat et iste quidem fugiat autem, voluptates porro unde
        maxime nam quae asperiores, distinctio cupiditate ipsum ullam aliquid
        quod sint eos nesciunt ut. Laudantium dolor dicta velit quasi quod
        doloribus reprehenderit cumque laboriosam eligendi magni dolores aliquam
        minus adipisci, hic vel placeat possimus mollitia repellendus.
        Cupiditate, fugiat mollitia vero facilis nemo deserunt perferendis
        itaque veritatis rerum animi amet eum ab alias quas, laudantium aperiam
        quasi minus cum possimus unde sit. Itaque assumenda beatae cumque fuga a
        blanditiis, tempora sed quibusdam illum quia sequi quaerat maxime,
        reiciendis aut ipsum amet exercitationem culpa aperiam repellat pariatur
        dolores debitis non neque quo. Asperiores repudiandae eligendi sit nemo
        neque molestiae id tempora obcaecati dolores aspernatur possimus quam
        doloribus quasi nulla qui hic aliquid perferendis fuga, quas earum
        dolorum facilis sint culpa! Distinctio earum similique aperiam, maxime
        exercitationem qui, saepe ex explicabo aspernatur accusamus sed quia
        voluptate reiciendis, non dolorem voluptatibus quidem eius at placeat.
        Obcaecati, dolor ipsam quisquam tempora fugiat aspernatur vitae.
      </div>
    </template>
    <template #footer>
      <NavigationBottom />
    </template>
  </ClassicLayout>
</template>

<script>
import ClassicLayout from '@/layouts/ClassicLayout.vue';
import BaseHeader from '@/components/BaseHeader.vue';
// // import ArticleMini from '@/components/ArticleMini.vue';
// import Button from '@/components/inputs/Button.vue';
import MenuDrawerPanel from '@/components/MenuDrawerPanel.vue';
import BaseAvatar from '@/components/BaseAvatar.vue';
import NavigationBottom from '@/components/NavigationBottom.vue';
import IconMenu from '@/assets/icons/menu.svg';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TenantHome',
  props: ['tenantSlug'],
  components: {
    ClassicLayout,
    BaseHeader,
    // ArticleMini,
    // Button,
    MenuDrawerPanel,
    BaseAvatar,
    IconMenu,
    NavigationBottom
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('global', ['isDrawerOpenUpdate'])
  }
};
</script>
